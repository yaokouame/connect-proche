
// Prescription related types
export interface PrescribedMedication {
  name: string;
  dosage?: string;
  frequency?: string;
  duration?: string;
  instructions?: string;
  startDate?: string;
  endDate?: string;
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

export interface Prescription {
  id: string;
  patientId: string;
  professionalId: string;
  professionalName: string;
  date: string; // Format: YYYY-MM-DD or DD/MM/YYYY
  expiryDate?: string;
  status: 'active' | 'expired' | 'pending';
  medications: PrescribedMedication[];
  instructions?: string;
  prescriptionImage?: PrescriptionFile;
  
  // Additional fields
  pharmacy?: string;
  refillable?: boolean;
  remainingRefills?: number;
  lastRefillDate?: string;
  notes?: string;
}
