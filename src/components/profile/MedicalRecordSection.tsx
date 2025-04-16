
import React from "react";
import { AlertTriangle } from "lucide-react";
import MedicalHistorySection from "./MedicalHistorySection";
import MedicationsSection from "./MedicationsSection";
import AllergiesSection from "./AllergiesSection";
import BloodTypeSection from "./BloodTypeSection";
import VaccinationsSection from "./VaccinationsSection";
import PrescriptionsSection from "./PrescriptionsSection";
import EmergencyContactSection from "./EmergencyContactSection";
import MedicalShareSection from "./MedicalShareSection";
import PatientQrCodeSection from "./PatientQrCodeSection";
import { MedicalInfoBanner } from "./MedicalInfoBanner";
import UnauthorizedMedicalRecord from "./UnauthorizedMedicalRecord";
import { PatientProfile, Prescription, Vaccination, EmergencyContact } from "@/types/user";

interface MedicalRecordSectionProps {
  medicalHistory: string[];
  setMedicalHistory: React.Dispatch<React.SetStateAction<string[]>>;
  medications: string[];
  setMedications: React.Dispatch<React.SetStateAction<string[]>>;
  allergies: string[];
  setAllergies: React.Dispatch<React.SetStateAction<string[]>>;
  prescriptions: Prescription[];
  userRole: string;
  bloodType: string;
  setBloodType: React.Dispatch<React.SetStateAction<string>>;
  vaccinations: Vaccination[];
  setVaccinations: React.Dispatch<React.SetStateAction<Vaccination[]>>;
  emergencyContact: EmergencyContact | undefined;
  setEmergencyContact: React.Dispatch<React.SetStateAction<EmergencyContact | undefined>>;
  patientId: string;
}

const MedicalRecordSection = ({
  medicalHistory,
  setMedicalHistory,
  medications,
  setMedications,
  allergies,
  setAllergies,
  prescriptions,
  userRole,
  bloodType,
  setBloodType,
  vaccinations,
  setVaccinations,
  emergencyContact,
  setEmergencyContact,
  patientId
}: MedicalRecordSectionProps) => {
  // Add new medical history item
  const addMedicalHistoryItem = (item: string) => {
    setMedicalHistory([...medicalHistory, item]);
  };

  // Remove medical history item
  const removeMedicalHistoryItem = (index: number) => {
    const newHistory = [...medicalHistory];
    newHistory.splice(index, 1);
    setMedicalHistory(newHistory);
  };

  // Add medication
  const addMedication = (item: string) => {
    setMedications([...medications, item]);
  };

  // Remove medication
  const removeMedication = (index: number) => {
    const newMedications = [...medications];
    newMedications.splice(index, 1);
    setMedications(newMedications);
  };

  // Add allergy
  const addAllergy = (item: string) => {
    setAllergies([...allergies, item]);
  };

  // Remove allergy
  const removeAllergy = (index: number) => {
    const newAllergies = [...allergies];
    newAllergies.splice(index, 1);
    setAllergies(newAllergies);
  };

  if (userRole !== "patient") {
    return <UnauthorizedMedicalRecord />;
  }

  // Create patient profile object to pass to the QR code section
  const patientProfile: PatientProfile = {
    id: patientId,
    name: "", // This will be filled from the user context
    email: "",
    role: "patient",
    medicalHistory,
    medications,
    allergies,
    bloodType: bloodType as PatientProfile["bloodType"],
    vaccinations,
    emergencyContact
  };

  return (
    <div className="space-y-2">
      <MedicalInfoBanner />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <MedicalHistorySection
            medicalHistory={medicalHistory}
            addMedicalHistoryItem={addMedicalHistoryItem}
            removeMedicalHistoryItem={removeMedicalHistoryItem}
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
          
          <BloodTypeSection
            bloodType={bloodType}
            setBloodType={setBloodType}
          />
        </div>
        
        <div className="space-y-6">
          <EmergencyContactSection
            emergencyContact={emergencyContact}
            setEmergencyContact={setEmergencyContact}
          />
          
          <PatientQrCodeSection patient={patientProfile} />
          
          <MedicalShareSection patientId={patientId} />
          
          <VaccinationsSection
            vaccinations={vaccinations}
            setVaccinations={setVaccinations}
          />
          
          <PrescriptionsSection prescriptions={prescriptions} />
        </div>
      </div>
    </div>
  );
};

export default MedicalRecordSection;
