
import { PatientProfile } from "@/types/user";

/**
 * Formats essential patient health information for QR code generation
 */
export const formatPatientQrData = (patient: PatientProfile): string => {
  const essentialInfo = {
    name: patient.name,
    dateOfBirth: patient.dateOfBirth || 'Non spécifié',
    bloodType: patient.bloodType || 'Non spécifié',
    allergies: patient.allergies || [],
    medications: patient.medications || [],
    emergencyContact: patient.emergencyContact ? {
      name: patient.emergencyContact.name,
      relationship: patient.emergencyContact.relationship,
      phone: patient.emergencyContact.phone
    } : null
  };

  return JSON.stringify(essentialInfo);
};
