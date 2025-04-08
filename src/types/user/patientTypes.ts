
import { EmergencyContact, InsuranceInfo, Vaccination } from './insuranceTypes';
import { User } from './userTypes';

export interface PatientProfile extends User {
  role: 'patient';
  dateOfBirth?: string;
  allergies?: string[];
  medications?: string[];
  medicalHistory?: string[];
  vaccinations?: Vaccination[];
  emergencyContact?: EmergencyContact;
  insuranceInfo?: InsuranceInfo;
  bloodType?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-' | 'unknown';
  cmuCardNumber?: string;
  isSharingMedicalData?: boolean;
  authorizedDoctors?: string[];
}

export interface Medication {
  name: string;
  dosage?: string;
  frequency?: string;
  duration?: string;
  instructions?: string;
  startDate?: string;
  endDate?: string;
}
