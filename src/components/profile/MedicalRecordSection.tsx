
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PrescriptionList from "@/components/prescriptions/PrescriptionList";
import { Prescription } from "@/types/user";

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
  const [newMedicalHistory, setNewMedicalHistory] = useState("");
  const [newMedication, setNewMedication] = useState("");
  const [newAllergy, setNewAllergy] = useState("");

  const addMedicalHistory = () => {
    if (newMedicalHistory.trim()) {
      setMedicalHistory([...medicalHistory, newMedicalHistory.trim()]);
      setNewMedicalHistory("");
    }
  };

  const removeMedicalHistory = (index: number) => {
    setMedicalHistory(medicalHistory.filter((_, i) => i !== index));
  };

  const addMedication = () => {
    if (newMedication.trim()) {
      setMedications([...medications, newMedication.trim()]);
      setNewMedication("");
    }
  };

  const removeMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const addAllergy = () => {
    if (newAllergy.trim()) {
      setAllergies([...allergies, newAllergy.trim()]);
      setNewAllergy("");
    }
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
        <CardTitle>Dossier médical</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Antécédents médicaux</h3>
          <div className="space-y-2">
            {medicalHistory.length > 0 ? (
              <ul className="list-disc list-inside space-y-1">
                {medicalHistory.map((item, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span>{item}</span>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeMedicalHistory(index)} 
                      className="h-8 px-2 text-red-500 hover:text-red-700"
                    >
                      Supprimer
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">Aucun antécédent médical enregistré</p>
            )}
            
            <div className="flex mt-2">
              <Input
                placeholder="Ajouter un antécédent médical"
                value={newMedicalHistory}
                onChange={(e) => setNewMedicalHistory(e.target.value)}
                className="mr-2"
              />
              <Button 
                type="button" 
                onClick={addMedicalHistory}
                variant="outline"
              >
                Ajouter
              </Button>
            </div>
          </div>
        </div>
        
        <div className="space-y-2 border-t pt-4">
          <h3 className="text-lg font-medium">Médicaments actuels</h3>
          <div className="space-y-2">
            {medications.length > 0 ? (
              <ul className="list-disc list-inside space-y-1">
                {medications.map((med, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span>{med}</span>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeMedication(index)} 
                      className="h-8 px-2 text-red-500 hover:text-red-700"
                    >
                      Supprimer
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">Aucun médicament enregistré</p>
            )}
            
            <div className="flex mt-2">
              <Input
                placeholder="Ajouter un médicament"
                value={newMedication}
                onChange={(e) => setNewMedication(e.target.value)}
                className="mr-2"
              />
              <Button 
                type="button" 
                onClick={addMedication}
                variant="outline"
              >
                Ajouter
              </Button>
            </div>
          </div>
        </div>
        
        <div className="space-y-2 border-t pt-4">
          <h3 className="text-lg font-medium">Allergies connues</h3>
          <div className="space-y-2">
            {allergies.length > 0 ? (
              <ul className="list-disc list-inside space-y-1">
                {allergies.map((allergy, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span>{allergy}</span>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeAllergy(index)} 
                      className="h-8 px-2 text-red-500 hover:text-red-700"
                    >
                      Supprimer
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">Aucune allergie enregistrée</p>
            )}
            
            <div className="flex mt-2">
              <Input
                placeholder="Ajouter une allergie"
                value={newAllergy}
                onChange={(e) => setNewAllergy(e.target.value)}
                className="mr-2"
              />
              <Button 
                type="button" 
                onClick={addAllergy}
                variant="outline"
              >
                Ajouter
              </Button>
            </div>
          </div>
        </div>
        
        <div className="space-y-2 border-t pt-4">
          <h3 className="text-lg font-medium">Ordonnances</h3>
          <PrescriptionList prescriptions={prescriptions} />
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicalRecordSection;
