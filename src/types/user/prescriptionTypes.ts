
export interface Prescription {
  id: string;
  patientId: string;
  professionalId: string;
  professionalName: string;
  date: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'completed';
  medications: PrescribedMedication[];
  instructions: string;
  prescriptionImage?: PrescriptionFile;
}

export interface PrescribedMedication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

export interface PrescriptionFile {
  id: string;
  fileUrl: string;
  fileName: string;
  uploadDate: string;
  verified?: boolean;
  verifiedBy?: string;
  verificationDate?: string;
}
