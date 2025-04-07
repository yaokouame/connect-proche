
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'patient' | 'professional' | 'none';
  profileImageUrl?: string;
  created_at?: string;
  allergies?: string[];
  medications?: string[];
  medicalHistory?: string[];
  vaccinations?: {
    name: string;
    date: string;
    expiryDate?: string;
  }[];
  emergencyContacts?: {
    name: string;
    relationship: string;
    phone: string;
    email?: string;
  }[];
  insuranceInfo?: {
    provider: string;
    policyNumber: string;
    membershipNumber: string;
    validUntil: string;
    coverageType?: string;
    coveragePercentage?: number;
  };
  bloodType?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-' | 'unknown';
  preferences?: {
    language: string;
    notifications: boolean;
    theme: 'light' | 'dark' | 'system';
    accessibility: {
      fontSize: 'small' | 'medium' | 'large';
      highContrast: boolean;
    };
  };
  isProfileComplete?: boolean;
  isSharingMedicalData?: boolean;
  authorizedDoctors?: string[];
}
