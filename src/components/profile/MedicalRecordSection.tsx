
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Prescription, Vaccination, EmergencyContact, InsuranceInfo, InsuranceVoucher } from "@/types/user";
import { useLanguage } from "@/contexts/LanguageContext";
import UnauthorizedMedicalRecord from "./UnauthorizedMedicalRecord";
import MedicalInfoBanner from "./MedicalInfoBanner";
import MedicalHistorySection from "./MedicalHistorySection";
import MedicationsSection from "./MedicationsSection";
import AllergiesSection from "./AllergiesSection";
import PrescriptionsSection from "./PrescriptionsSection";
import BloodTypeSection from "./BloodTypeSection";
import VaccinationsSection from "./VaccinationsSection";
import EmergencyContactSection from "./EmergencyContactSection";
import MedicalShareSection from "./MedicalShareSection";
import InsuranceSection from "./InsuranceSection";

interface MedicalRecordSectionProps {
  medicalHistory: string[];
  setMedicalHistory: React.Dispatch<React.SetStateAction<string[]>>;
  medications: string[];
  setMedications: React.Dispatch<React.SetStateAction<string[]>>;
  allergies: string[];
  setAllergies: React.Dispatch<React.SetStateAction<string[]>>;
  prescriptions: Prescription[];
  userRole: string;
  // New props for complete health profile
  bloodType?: string;
  setBloodType?: React.Dispatch<React.SetStateAction<string>>;
  vaccinations: Vaccination[];
  setVaccinations: React.Dispatch<React.SetStateAction<Vaccination[]>>;
  emergencyContact?: EmergencyContact;
  setEmergencyContact: React.Dispatch<React.SetStateAction<EmergencyContact | undefined>>;
  patientId: string;
  // New props for insurance information
  insuranceInfo?: InsuranceInfo;
  setInsuranceInfo?: React.Dispatch<React.SetStateAction<InsuranceInfo | undefined>>;
  insuranceVouchers?: InsuranceVoucher[];
  setInsuranceVouchers?: React.Dispatch<React.SetStateAction<InsuranceVoucher[] | undefined>>;
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
  patientId,
  insuranceInfo,
  setInsuranceInfo,
  insuranceVouchers,
  setInsuranceVouchers
}: MedicalRecordSectionProps) => {
  const { t } = useLanguage();
  
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
        
        {setBloodType && (
          <BloodTypeSection 
            bloodType={bloodType}
            setBloodType={setBloodType}
          />
        )}

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
        
        <VaccinationsSection 
          vaccinations={vaccinations}
          setVaccinations={setVaccinations}
        />
        
        <EmergencyContactSection 
          emergencyContact={emergencyContact}
          setEmergencyContact={setEmergencyContact}
        />
        
        {setInsuranceInfo && (
          <InsuranceSection
            insuranceInfo={insuranceInfo}
            setInsuranceInfo={setInsuranceInfo}
            insuranceVouchers={insuranceVouchers || []}
            setInsuranceVouchers={setInsuranceVouchers}
          />
        )}
        
        <PrescriptionsSection prescriptions={prescriptions} />
        
        <MedicalShareSection patientId={patientId} />
      </CardContent>
    </Card>
  );
};

export default MedicalRecordSection;
