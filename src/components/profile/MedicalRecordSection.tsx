
import React from "react";
import { Prescription, Vaccination, EmergencyContact, InsuranceInfo, InsuranceVoucher } from "@/types/user";
import { useLanguage } from "@/contexts/LanguageContext";
import MedicalRecordContainer from "./medical-records/MedicalRecordContainer";

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

const MedicalRecordSection = (props: MedicalRecordSectionProps) => {
  const { t } = useLanguage();
  
  return <MedicalRecordContainer {...props} />;
};

export default MedicalRecordSection;
